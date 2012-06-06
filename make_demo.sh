#! /bin/bash
coffee -co build/demo src/demo
jade --out build/demo src/demo
mkdir -p build/demo/modules
ln -fs ../../timeline build/demo/modules/timeline
ln -fs ../../mockups build/demo/mockups
ln -fs ../../lib build/demo/lib
