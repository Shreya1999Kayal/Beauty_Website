// factorial using loop
#include <stdio.h>
int fact(int n)
{
    int f = 1;
    if (n == 0 || n == 1)
        f = 1;
    else
        for (int i = 1; i <= n; i++)
        {
            f = f * i;
        }
    printf("Factorial of %d is %d", n, f);
}
int main()
{
    int n;
    printf("Enter a number for factorial : ");
    scanf("%d", &n);
    fact(n);
    return 0;
}
