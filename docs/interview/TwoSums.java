package Example.LeetCode;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: yan
 * @Date: 2019/5/26/0026 19:37
 * @Description: 两数之和
 */
public class TwoSum {

    /**
     *
     * @param args
     */
    public static void main(String[] args) {
        int sum[] = {2,7,11,5};
        int target =18;

        int[] ints = TwoSum.twoSum(sum, target);
        System.out.println(Arrays.toString(ints));
    }

    public static int[] twoSum(int[] sum, int target){

        int[] abb = new int[2];
        Map<Integer,Integer> map = new HashMap<>(sum.length);
        for(int i=0;i<sum.length;i++){
            int value = target-sum[i];
            Integer index = map.get(value);
            if(index!=null && index!=i){
                abb[0]=i;
                abb[1]=index;
                break;
            }
            map.put(sum[i],i);
        }
        return abb;
    }
}