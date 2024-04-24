/*
import java.util.*;
public class ArrayOperations {
    // Method to display the contents of an array
    public static void displayArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
    // Method to calculate the sum of all elements in an array
    public static int calculateSum(int[] arr) {
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
    // Method to calculate the average of all elements in an array
    public static double calculateAverage(int[] arr) {
        int sum = calculateSum(arr);
        return (double) sum / arr.length;
    }
    // Method to find the largest element in an array
    public static int findLargest(int[] arr) {
        int max = arr[0];
        for (int num : arr) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }
    // Method to find the smallest element in an array
    public static int findSmallest(int[] arr) {
        int min = arr[0];
        for (int num : arr) {
            if (num < min) {
                min = num;
            }
        }
        return min;
    }
    // Method to sort an array in ascending order
    public static int[] sortArray(int[] arr) {
        int[] sortedArray = arr.clone();
        Arrays.sort(sortedArray);
        return sortedArray;
    }
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Accepting  size of array from the user
        System.out.print("Enter the size of the array: ");
        int n = scanner.nextInt();
        int[] array = new int[n];
        System.out.println("Enter " + n + " integers:");
        for (int i = 0; i < n; i++) {
            array[i] = scanner.nextInt();
        }
        // Displaying the contents of the array
        System.out.println("Contents of the array:");
        displayArray(array);
        // Calculating and displaying the sum of all elements
        System.out.println("Sum of all elements: " + calculateSum(array));
        // Calculating and displaying the average of all elements
        System.out.println("Average of all elements: " + calculateAverage(array));
        // Finding and displaying the largest element
        System.out.println("Largest element: " + findLargest(array));
        // Finding and displaying the smallest element
        System.out.println("Smallest element: " + findSmallest(array));
        // Sorting the array in ascending order and displaying the sorted array
        int[] sortedArray = sortArray(array);
        System.out.println("Sorted array:");
        displayArray(sortedArray);
        scanner.close();
    }
}
*\
/*
*\
/*
*\
/*
*\
/*
*\
/*
*\