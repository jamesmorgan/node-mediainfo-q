Mediainfo
=========

Wrapper around the `mediainfo` command for obtaining information about media enhanced with the Q promise library
files.

Overview
--------

This module provides an interface to the `mediainfo` command. It returns the
(parsed) output of the command with all the keys lower-cased. There's not a lot
to say here.

Usage
-----

The module exposes just one function, which has a signature of:

`mediainfo("/path/to/file", "/path/to/other/file", [...]).then(...)`

It's really easier to just see the output, so here:

```
[
  {
    tracks: [
      {
        type: 'Audio',
        format: 'MPEG Audio',
        format_version: 'Version 1',
        format_profile: 'Layer 3',
        mode: 'Joint stereo',
        duration: '3mn 2s',
        bit_rate_mode: 'Constant',
        bit_rate: '320 Kbps',
        channel_s_: '2 channels',
        sampling_rate: '44.1 KHz',
        compression_mode: 'Lossy',
        stream_size: '6.97 MiB (100%)',
        writing_library: 'LAME3.97'
      }
    ],
    complete_name: 'test1.mp3',
    format: 'MPEG Audio',
    file_size: '6.98 MiB',
    duration: '3mn 2s',
    overall_bit_rate: '320 Kbps',
    album: 'We No Speak Americano (High Rankin\'s Bait n Wobble Mix)',
    track_name: 'We No Speak Americano (High Rankin\'s Bait n Wobble Mix)',
    track_name_position: '1',
    track_name_total: '1',
    performer: 'Yolanda Be Cool & DCUP',
    accompaniment: 'High Rankin',
    genre: 'Dubstep',
    recorded_date: '2010',
    writing_library: 'LAME in FL Studio 8 / LAME3.97'
  },
  {
    tracks: [
      {
        type: 'Audio',
        format: 'MPEG Audio',
        format_version: 'Version 1',
        format_profile: 'Layer 3',
        mode: 'Joint stereo',
        duration: '3mn 2s',
        bit_rate_mode: 'Constant',
        bit_rate: '320 Kbps',
        channel_s_: '2 channels',
        sampling_rate: '44.1 KHz',
        compression_mode: 'Lossy',
        stream_size: '6.97 MiB (100%)',
        writing_library: 'LAME3.97'
      }
    ],
    complete_name: 'test2.mp3',
    format: 'MPEG Audio',
    file_size: '6.98 MiB',
    duration: '3mn 2s',
    overall_bit_rate: '320 Kbps',
    album: 'We No Speak Americano (High Rankin\'s Bait n Wobble Mix)',
    track_name: 'We No Speak Americano (High Rankin\'s Bait n Wobble Mix)',
    track_name_position: '1',
    track_name_total: '1',
    performer: 'Yolanda Be Cool & DCUP',
    accompaniment: 'High Rankin',
    genre: 'Dubstep',
    recorded_date: '2010',
    writing_library: 'LAME in FL Studio 8 / LAME3.97'
  }
]
```

(bite me, it's a decent track)

Example
-------

```javascript
var mediainfo = require("mediainfo-q");

mediainfo("/path/to/file", "/path/to/other/file")
    .then(function (res) {
      console.log(res)
    }).catch(function (err) {
      console.error(err)
    });
```

Requirements
------------

The `mediainfo` command has to be available somewhere in the PATH of the user
node is running as.

* `brew install mediainfo` - should install the latest on Mac

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))

Changes from original
---------------------

* GitHub ([jamesmorgan](http://github.com/jamesmorgan))
* Adding `Q` promise library instead of callback.
* Enhancing response error with full standard out.
* Updated to use with the latest version of `mediainfo`
* Updated to use latest version of `filesize-parser`
* Added .gitignore
* try/catch around `file_size` - see [#5](https://github.com/jamesmorgan/node-mediainfo-q/pull/5) - thanks to [@gabrielstuff](https://github.com/gabrielstuff)
