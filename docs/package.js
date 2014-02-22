(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "sound\n=====\n\nSounds in da browser.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Sound\n=====\n\nA simple interface for playing sounds in games.\n\nHelpers\n-------\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\nImplementation\n--------------\n\n    format = \"wav\"\n    sounds = {}\n    globalVolume = 1\n\n    # TODO: Allow configuration of base path\n    # TODO: Figure out audio resources\n    basePath = \"http://strd6.github.io/cdn/assets/\"\n\n    loadSoundChannel = (name) ->\n      url = \"#{basePath}/#{name}.#{format}\"\n\n      sound = extend document.createElement(\"audio\"),\n        autobuffer: true\n        preload: 'auto'\n        src: url\n\n    module.exports = Sound = (id, maxChannels) ->\n      play: ->\n        Sound.play(id, maxChannels)\n\n      stop: ->\n        Sound.stop(id)\n  \n    extend Sound,\n\nSet the global volume modifier for all sound effects.\n\nAny value set is clamped between 0 and 1. This is multiplied\ninto each individual effect that plays.\n\nIf no argument is given return the current global sound effect volume.\n\n      volume: (newVolume) ->\n        if newVolume?\n          globalVolume = newVolume.clamp(0, 1)\n  \n        return globalVolume\n\nPlay a sound from your sounds directory with the given name.\n  \n>     # plays a sound called explode from your sounds directory\n>     Sound.play('explode')\n\n      play: (id, maxChannels) ->\n        # TODO: Too many channels crash Chrome!!!1\n        maxChannels ||= 4\n  \n        unless sounds[id]\n          sounds[id] = [loadSoundChannel(id)]\n  \n        channels = sounds[id]\n\n        freeChannels = channels.select (sound) ->\n          sound.currentTime is sound.duration or sound.currentTime is 0\n  \n        if channel = freeChannels.first()\n          try\n            channel.currentTime = 0\n  \n          channel.volume = globalVolume\n          channel.play()\n        else\n          if !maxChannels || channels.length < maxChannels\n            sound = loadSoundChannel(id)\n            channels.push(sound)\n            sound.play()\n            sound.volume = globalVolume\n\nStop a sound while it is playing.\n  \n>     Sound.stop('explode')\n\n      stop: (id) ->\n        sounds[id]?.stop()\n\nSet the global volume modifier for all sound effects.\n\nAny value set is clamped between 0 and 1. This is multiplied\ninto each individual effect that plays.\n\nIf no argument is given return the current global sound effect volume.\n\n    Sound.globalVolume = Sound.volume\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\n",
      "type": "blob"
    },
    "test/sound.coffee": {
      "path": "test/sound.coffee",
      "mode": "100644",
      "content": "Sound = require \"/main\"\n\ndescribe \"Sound\", ->\n  it \"Should do stuff\", ->\n    assert Sound.play\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var Sound, basePath, extend, format, globalVolume, loadSoundChannel, sounds,\n    __slice = [].slice;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  format = \"wav\";\n\n  sounds = {};\n\n  globalVolume = 1;\n\n  basePath = \"http://strd6.github.io/cdn/assets/\";\n\n  loadSoundChannel = function(name) {\n    var sound, url;\n    url = \"\" + basePath + \"/\" + name + \".\" + format;\n    return sound = extend(document.createElement(\"audio\"), {\n      autobuffer: true,\n      preload: 'auto',\n      src: url\n    });\n  };\n\n  module.exports = Sound = function(id, maxChannels) {\n    return {\n      play: function() {\n        return Sound.play(id, maxChannels);\n      },\n      stop: function() {\n        return Sound.stop(id);\n      }\n    };\n  };\n\n  extend(Sound, {\n    volume: function(newVolume) {\n      if (newVolume != null) {\n        globalVolume = newVolume.clamp(0, 1);\n      }\n      return globalVolume;\n    },\n    play: function(id, maxChannels) {\n      var channel, channels, freeChannels, sound;\n      maxChannels || (maxChannels = 4);\n      if (!sounds[id]) {\n        sounds[id] = [loadSoundChannel(id)];\n      }\n      channels = sounds[id];\n      freeChannels = channels.select(function(sound) {\n        return sound.currentTime === sound.duration || sound.currentTime === 0;\n      });\n      if (channel = freeChannels.first()) {\n        try {\n          channel.currentTime = 0;\n        } catch (_error) {}\n        channel.volume = globalVolume;\n        return channel.play();\n      } else {\n        if (!maxChannels || channels.length < maxChannels) {\n          sound = loadSoundChannel(id);\n          channels.push(sound);\n          sound.play();\n          return sound.volume = globalVolume;\n        }\n      }\n    },\n    stop: function(id) {\n      var _ref;\n      return (_ref = sounds[id]) != null ? _ref.stop() : void 0;\n    }\n  });\n\n  Sound.globalVolume = Sound.volume;\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\"};",
      "type": "blob"
    },
    "test/sound": {
      "path": "test/sound",
      "content": "(function() {\n  var Sound;\n\n  Sound = require(\"/main\");\n\n  describe(\"Sound\", function() {\n    return it(\"Should do stuff\", function() {\n      return assert(Sound.play);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/sound.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "repository": {
    "id": 17075989,
    "name": "sound",
    "full_name": "distri/sound",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/sound",
    "description": "Sounds in da browser.",
    "fork": false,
    "url": "https://api.github.com/repos/distri/sound",
    "forks_url": "https://api.github.com/repos/distri/sound/forks",
    "keys_url": "https://api.github.com/repos/distri/sound/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/sound/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/sound/teams",
    "hooks_url": "https://api.github.com/repos/distri/sound/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/sound/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/sound/events",
    "assignees_url": "https://api.github.com/repos/distri/sound/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/sound/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/sound/tags",
    "blobs_url": "https://api.github.com/repos/distri/sound/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/sound/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/sound/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/sound/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/sound/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/sound/languages",
    "stargazers_url": "https://api.github.com/repos/distri/sound/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/sound/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/sound/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/sound/subscription",
    "commits_url": "https://api.github.com/repos/distri/sound/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/sound/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/sound/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/sound/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/sound/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/sound/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/sound/merges",
    "archive_url": "https://api.github.com/repos/distri/sound/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/sound/downloads",
    "issues_url": "https://api.github.com/repos/distri/sound/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/sound/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/sound/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/sound/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/sound/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/sound/releases{/id}",
    "created_at": "2014-02-22T02:01:15Z",
    "updated_at": "2014-02-22T02:01:15Z",
    "pushed_at": "2014-02-22T02:01:15Z",
    "git_url": "git://github.com/distri/sound.git",
    "ssh_url": "git@github.com:distri/sound.git",
    "clone_url": "https://github.com/distri/sound.git",
    "svn_url": "https://github.com/distri/sound",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});