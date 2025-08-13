/* Optimized sleep sort algorithm by Afghan_Goat

STATS:
Naively tought algorithm runtime: O(2n) or really?? In reality it is exponential os several NO OPERATION-s will be executed because waiting is still an operation
Main algorithm runtime: O(2n^n)
Fine tuning runtime: O(m) where m is the 1/clock_speed of your CPU
^Except these are lies which sound trivial at a first glance but NOPs are still operations, so this is closer to a O(n!) runtime.

This function is an async,recursive,fine-tuned sleep sort with handling some edge cases.
It can also "learn" the required parameters and adjust itself to work accordingly to those.

Feel free to edit the config!
*/

//CONFIG:
const maximum_of_maximum_of_maximum=5.0; //How much the magnitudes can differ between the min element and max element.
const optimize_steps=0.01; //The less you set this the more it will take to find a good epsilon value but also it will be somewhat more optimized. I recommend not changing this, not worth it.

const base_multiplier=10.0; //For better results, set this to higher, set this to 10+(log10(maximum_expected_value)-2)*40 .

//A hardcoded sample array, you must give a simillar array as the ones you will be working with.
const arr1=[-4,20.0,15.4,4.6,28.1];
const arr1_sorted=[-4,4.6,15.4,20,28.1]; //Hardcoded sorted allows for fine tuning!
//END CONFIG:

/*
Further improvements: (Maybe I will add some of these)
-Wait for log(i) instead of i/max for unbalanced list.
*/
let eps=1.0; //Required seconds

function is_arr_same(a1,a2){
	
    if(a1.length!==a2.length){
        return false;
    }
	
    for(let i=0;i<a1.length;i++){
        if(a1[i]!==a2[i]){
            return false;
        }
    }
	
    return true;
}

function optimized_sleep_sort(arr_initial){
    return new Promise((resolve) => {
        let arr2=[];
        let max=arr_initial[0];
        let min=arr_initial[0];
        
        //Find max and min value
        for(let i=1;i<arr_initial.length;i++){
            if(max<Math.abs(arr_initial[i])){
                max=Math.abs(arr_initial[i]);
            }
            if(min>arr_initial[i]){
                min=arr_initial[i];
            }
        }
        let maximum_of_maximum=Math.log(max)-Math.log(Math.abs(min));
        
        //Hard limit check for precision
        if(maximum_of_maximum>maximum_of_maximum_of_maximum){
            max=Math.pow(10,maximum_of_maximum_of_maximum);
        }
        
        if(max==0){
            resolve(arr_initial); //All elements are 0, return initial array.
        }
        
        if(min>0.0){
            min=0.0; //no need to offset for negative numbers
        }
        
        for(let i=0;i<arr_initial.length;i++){
            setTimeout(()=>{
                if(arr_initial[i]!==undefined){
                    arr2.push(arr_initial[i]);
                    if(i==arr_initial.length-1){
                        resolve(arr2);
                    }
                }
                
            },(arr_initial[i]+min)/(max/eps/base_multiplier));
        }
    });
}

async function finetune_epsilon(){
    optimized_sleep_sort(arr1).then((result) => {
        if(is_arr_same(result,arr1_sorted)===true&&eps>optimize_steps){
			
            eps-=optimize_steps;
            finetune_epsilon();
        } else {
            if(base_multiplier>=20.0){
                eps+=optimize_steps; //For retaining accuracy
            }
			eps+=optimize_steps; //For retaining accuracy
			
            console.log("Fine tuned epsilon: "+eps);
			main(); //call your main code here
        }
    });
}

//Must call this before the code! If you don't call this, the epsilon will not be optimized for your CPU.
finetune_epsilon();

//Example code
function main(){
	optimized_sleep_sort(arr1).then((result) => {
		console.log(result);
	});
}
