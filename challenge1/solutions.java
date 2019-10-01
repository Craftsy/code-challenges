// Java Solution to Bluprint Challenge 1

// Solution 1
import java.lang.Long.*;

public class CodeChallenge1 {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("You must pass in some arguments ya dumb dumb.");
            return;
        }
        String[] chars = args[0].split("");
        Long total = 1L;
        for (String character : chars) {
            Long num = Long.valueOf(character);
            if (num != 0) {
                total *= num;
            }
        }
        System.out.println("The total is " + total);
    }
}

// Solution 2
class JavaScratch
{
    public static void main( String[] args )
    {
        int number = new Integer( args[0] );

        if ( number <= 0 )
        {
            System.err.println( "Number be a positive integer" );
            System.exit( 1 );
        }

        int product = 1;

        while ( number > 0 )
        {
            int nextDigit = number % 10;
            if ( nextDigit > 0 )
            {
                product = product * nextDigit;
            }
            number = number / 10;
        }
        System.out.println( product );
    }
}