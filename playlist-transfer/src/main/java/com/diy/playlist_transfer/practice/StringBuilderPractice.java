package com.diy.playlist_transfer.practice;

public class StringBuilderPractice {

    public static String reverseWords(String string) {
        StringBuilder sb = new StringBuilder(string);
        return sb.reverse().toString();
    }

    public static void main(String[] args) {
//        String greeting = "Hello, World";
//        StringBuilder sb = new StringBuilder(greeting);
//        sb.append("!");
//        System.out.println(sb);

        String test1 = "Java programming is fun";
        String test2 = "Hello world";
        String test3 = "One";
        String test4 = "Java, programming is fun!";

        System.out.println(reverseWords(test1));
        System.out.println(reverseWords(test2));
        System.out.println(reverseWords(test3));
        System.out.println(reverseWords(test4));
    }

}
