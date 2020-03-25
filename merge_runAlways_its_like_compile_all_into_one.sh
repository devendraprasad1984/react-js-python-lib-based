#!/bin/bash
dir="Components"
output="main.js"
source="$dir/*.js"
target="$output"
#remnove output file contents
true > $target
#define order of js files you want to merge into one index/main/app.js file
filesOrder=(
"globals"
"Home"
"Routing"
"NotFound"
"Accordian"
"BudgetForm"
"Helpers"
"About"
"Grid"
"QR"
"App"
)

loop_over_dir(){
for f in $1
do
  if [ $f != $dir/$output ] && [[ $f != *"_NA_"* ]];  then
    echo "$f is in process - $dir/$output"
    cat ${f} >> $target
    echo "" >> $target
  fi
done
echo "$target has been generated"
}
#loop_over_dir $source

loop_over_files_order(){
for i in "${filesOrder[@]}"
do
    if [[ $fl != *"_NA_"* ]];  then
      fl=$dir/$i.js
      echo "processing...$fl"
      cat $fl >> $target
      echo "" >> $target
    fi
done
echo "$target has been generated"
}

loop_over_files_order
