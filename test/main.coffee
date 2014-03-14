Audio = require "../main"

describe "Audio", ->
  it "should have Sound", ->
    assert Audio.Sound

  it "should have Music", ->
    assert Audio.Music

  it "should have a volume control", ->
    assert Audio.Control.volume
