Sound
=====

A simple interface for playing sounds in games.

Helpers
-------

    extend = (target, sources...) ->
      for source in sources
        for name of source
          target[name] = source[name]

      return target

Implementation
--------------

    format = "wav"
    sounds = {}
    globalVolume = 1

    loadSoundChannel = (name) ->
      url = "#{Sound.basePath}/#{name}.#{format}"

      sound = extend document.createElement("audio"),
        autobuffer: true
        preload: 'auto'
        src: url

    module.exports = Sound = (id, maxChannels) ->
      play: ->
        Sound.play(id, maxChannels)

      stop: ->
        Sound.stop(id)

    extend Sound,
      # TODO: Figure out handling of audio resources better
      basePath: "http://www.danielx.net/cdn/assets/"

Set the global volume modifier for all sound effects.

Any value set is clamped between 0 and 1. This is multiplied
into each individual effect that plays.

If no argument is given return the current global sound effect volume.

      volume: (newVolume) ->
        if newVolume?
          globalVolume = newVolume.clamp(0, 1)
  
        return globalVolume

Play a sound from your sounds directory with the given name.
  
>     # plays a sound called explode from your sounds directory
>     Sound.play('explode')

      play: (id, maxChannels) ->
        # TODO: Too many channels crash Chrome!!!1
        maxChannels ||= 4
  
        unless sounds[id]
          sounds[id] = [loadSoundChannel(id)]
  
        channels = sounds[id]

        freeChannels = channels.select (sound) ->
          sound.currentTime is sound.duration or sound.currentTime is 0
  
        if channel = freeChannels.first()
          try
            channel.currentTime = 0
  
          channel.volume = globalVolume
          channel.play()
        else
          if !maxChannels || channels.length < maxChannels
            sound = loadSoundChannel(id)
            channels.push(sound)
            sound.play()
            sound.volume = globalVolume

Stop a sound while it is playing.
  
>     Sound.stop('explode')

      stop: (id) ->
        sounds[id]?.stop()

Set the global volume modifier for all sound effects.

Any value set is clamped between 0 and 1. This is multiplied
into each individual effect that plays.

If no argument is given return the current global sound effect volume.

    Sound.globalVolume = Sound.volume
