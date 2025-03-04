package com.diy.playlist_transfer.practice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class StreamsPractice {

    public static void main(String[] args) {
        // ! Creating Streams

        // * From a collection
        List<String> names = List.of("Rahul", "Bakul", "Rakshit", "Manav", "Arnab");
        Stream<String> streamFromList = names.stream();

        // * From array
        String[] namesArray = {"Rahul", "Bakul", "Rakshit", "Manav", "Arnab"};
        Stream<String> streamFromArray = Arrays.stream(namesArray);

        // * Direct
        Stream<String> streamOfStrings = Stream.of("Rahul", "Bakul", "Rakshit", "Manav", "Arnab");

        // ! Basic stream operations

        // ? Filtering

        List<String> namesWithR = names.stream()
                .filter(name -> name.startsWith("R"))
                .toList();

//        System.out.println(namesWithR);

        // ? To upper case

        List<String> upperNames = names.stream()
                .map(name -> name.toUpperCase())
                .toList();

//        System.out.println(upperNames);


        List<String> sortedNames = names.stream()
                .sorted()
                .toList();


//        System.out.println(sortedNames);


        List<Integer> numbers = List.of(1,2,3,4,5);

        int sumOfSquares = numbers.stream()
                .mapToInt(n -> n * n)
                .sum();

    }
}
