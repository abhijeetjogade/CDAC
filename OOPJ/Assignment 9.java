/*1) Write a Java program that throws an arithmetic exception and catch it using a try-catch block.
class Assignment9 {
    public static void main(String[] args) {
        try{
            int a = 10;
            int b = 0;
            int num = a/b;
        }catch (ArithmeticException e) {
            System.out.println("ArithmeticException: Division by zero.");
        }
    }
}
*/

/*
2) Write a Java program to create a method that takes an integer as a parameter and throws an exception if the number is odd.

public class Main {
    public static void main(String[] args) {
        try {
            checkIfEven(5); 
            System.out.println("Number is even.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    public static void checkIfEven(int number) throws Exception {
        if (number % 2 != 0) throw new Exception("Number is odd.");
    }
}

*/
/*
3)Write a Java program throws an array index out of bound exception.

public class Assignment9 {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            // Trying to access an element at index 6 which is out of bounds
            int value = arr[6];
            System.out.println("Value: " + value);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index out of bounds exception caught!");
        }
    }
}


*/
/*
4)Write a code for arithmetic exception using one try block & multiple catch block & check which catch block handle that exception.

public class Assignment9{
    public static int divideByZero() {
        int numerator = 10;
        int denominator = 0;
        return numerator / denominator;
    }
    public static void main(String[] args) {
        try {
            int result = divideByZero();
        } catch (ArithmeticException ae) {
            System.out.println("ArithmeticException caught: Attempted to divide by zero.");
        } catch (Exception e) {
            System.out.println("General Exception caught: " + e.getMessage());
        }
    }
}
*\