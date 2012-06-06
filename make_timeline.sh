#! /bin/bash
coffee -co build/timeline src/timeline
jade --out build/timeline src/timeline
