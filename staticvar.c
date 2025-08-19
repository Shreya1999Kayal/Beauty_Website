// use of static and normal variable
#include <stdio.h>
int display()
{
    static int x;
    x++;
    return x;
}
int main()
{
    // Write C code here
    printf("\nx is %d", display()); // x is 1
    printf("\nx is %d", display()); //x is 2
    return 0;
}
