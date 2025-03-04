package com.diy.playlist_transfer.practice;

import java.util.*;

public class CollectionsPractice {

    public static void main(String[] args) {

        List<String> names = new ArrayList<>();
        names.add("Rahul");
        names.add("Bakul");
        names.add("Rakshit");
        names.add("Manav");

        // for(String name : names){
//            System.out.println(name);
//        }

        LinkedList<String> tasks = new LinkedList<>();
        tasks.add("Task1");
        tasks.addFirst("First task");
        tasks.addLast("Last Task");
        tasks.add("add task");
//        System.out.println(tasks.contains("Task1"));
//        System.out.println(tasks);

//        int num = 123456789;
//        int digits = (int) (Math.log10(num)) + 1;

        HashSet<String> hs = new HashSet<>();
        hs.add("Rahul");
        hs.add("Bakul");
        hs.add("Rakshit");
//        System.out.println(hs);

        HashMap<String, Integer> hm = new HashMap<>();
        hm.put("Rahul", 22);
        hm.put("Arnab", 25);
        hm.put("Pande", 26);
        System.out.println(hm.getOrDefault("Arnabb", 1));

//        hm.forEach((key, value) -> System.out.println(value));

        // ! Counting frequencies using HashMap
        int[] arr = {1, 2, 2, 3, 1, 4, 1};
        HashMap<Integer, Integer> freqMap = new HashMap<>();

        for(int num : arr){
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
//        System.out.println(freqMap);

    }
}
