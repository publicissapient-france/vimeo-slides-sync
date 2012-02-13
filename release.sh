#!/bin/sh

# uses yuicompressor to minify library
# requires
#  java
#  wget, ant OR tools/yuicompressor-2.4.7.jar

version=1.0.0
yuicompressor=yuicompressor-2.4.7

if [ ! -f tools/${yuicompressor}.jar ]; then
  wget --quiet http://yui.zenfs.com/releases/yuicompressor/${yuicompressor}.zip
  unzip -q ${yuicompressor}.zip
  rm ${yuicompressor}.zip
  ant -quiet -buildfile ${yuicompressor}/build.xml
  mkdir tools
  mv ${yuicompressor}/build/${yuicompressor}.jar tools/
  rm -r ${yuicompressor}/
fi

java -jar tools/${yuicompressor}.jar -o vimeo-slides-sync-${version}.min.js vimeo-slides-sync.js 

