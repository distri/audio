Music = require "/music"

describe "Music", ->
  it "should be able to play from urls", ->
    assert Music.playFromURL
