Music
=====

Super hack way to have background music.

    {extend} = require "./util"

    globalVolume = require "./global_volume"

    globalVolume.observe ->
      updateVolume(track)

    track = extend document.createElement("audio"),
      loop: "loop"

    document.body.appendChild(track)

    track.baseVolume = 1

    module.exports =
      playFromURL: (url, {volume}={}) ->
        volume ?= 1

        track.src = url
        track.baseVolume = volume

        updateVolume(track)

        track.play()

    updateVolume = (channel) ->
      channel.volume = channel.baseVolume * globalVolume()
