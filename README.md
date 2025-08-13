# Optimized quick sort algorithm

Because I had nothing to do...
This is self-tuning algorithm which abuses logarithm and division to be faster than the *naive* sleep sort algorithm.

## Stats

Naively tought algorithm runtime: O(2n) or *really??* In reality it is exponential os several NO OPERATION-s will be executed because waiting is still an operation
Main algorithm runtime: O(2n^n)
Fine tuning runtime: O(m) where m is the 1/clock_speed of your CPU
^Except these are lies which sound trivial at a first glance but NOPs are still operations, so this is closer to a O(n!) runtime.

This function is an async,recursive,fine-tuned sleep sort with handling some edge cases.
It can also "learn" the required parameters and adjust itself to work accordingly to those.

## Config

`const maximum_of_maximum_of_maximum=5.0; //How much the magnitudes can differ between the min element and max element.
const optimize_steps=0.01; //The less you set this the more it will take to find a good epsilon value but also it will be somewhat more optimized. I recommend not changing this, not worth it.

const base_multiplier=10.0; //For better results, set this to higher, set this to 10+(log10(maximum_expected_value)-2)*40 .

//A hardcoded sample array, you must give a simillar array as the ones you will be working with.
const arr1=[-4,20.0,15.4,4.6,28.1];
const arr1_sorted=[-4,4.6,15.4,20,28.1]; //Hardcoded sorted allows for fine tuning!`