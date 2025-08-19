// use of static and normal variable
#include <stdio.h>
void display()
{
    static int x;
    x++;
    printf("%d\n", x);
}
int main()
{
    display();
    display();
    return 0;
}


