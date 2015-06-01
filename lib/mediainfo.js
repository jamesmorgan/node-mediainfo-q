var child_process = require("child_process"),
    filesizeParser = require("filesize-parser"),
    expat = require("node-expat"),
    Q = require('q');

module.exports = function() {

  // Usage args
  var files = Array.prototype.slice.apply(arguments);

  var deferred = Q.defer();

  child_process.execFile("mediainfo", ["--Output=XML"].concat(files), function(err, stdout, stderr) {

    if (err) {
      deferred.reject({error: err, stdout: stdout});
      return;
    }

    var files = [],
        file = null,
        track = null,
        key = null;

    var parser = new expat.Parser();

    parser.on("startElement", function(name, attribs) {
      name = name.toLowerCase().replace(/_/ig, '');

      if (file === null && name === "file") {
        file = {tracks: []};

        for (var k in attribs) {
          file[k.toLowerCase()] = attribs[k];
        }

        return;
      }

      if (track === null && name === "track") {
        if (attribs.type === "General") {
          track = file;
        } else {
          track = {};

          for (var k in attribs) {
            track[k.toLowerCase()] = attribs[k];
          }
        }

        return;
      }

      if (track !== null) {
        key = name;
      }
    });

    parser.on("endElement", function(name) {
      name = name.toLowerCase().replace(/_/ig, '');

      if (track !== null && name === "track") {
        if (track !== file) { file.tracks.push(track); }
        track = null;
      }

      if (file !== null && name === "file") {
        if (file.file_size) {
          file.file_size_bytes = filesizeParser(file.file_size);
        }

        files.push(file);

        file = null;
      }

      key = null;
    });

    parser.on("text", function(text) {
      if (track !== null && key !== null) {
        track[key] = (track[key] || "") + text;
      }
    });

    if (!parser.parse(stdout)) {
      deferred.reject(Error(parser.getError()));
    } else {
      deferred.resolve(files);
    }
  });

  return deferred.promise;
};
