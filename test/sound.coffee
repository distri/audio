Sound = require "/sound"

describe "Sound", ->
  it "should be able to play from urls", ->
    assert Sound.playFromURL
