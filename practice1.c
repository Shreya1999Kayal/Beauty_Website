#include <stdio.h>
#include <string.h>


int main() {
    int n, l = 0, rem, pallindrome[100], x, f = 0, num;
    printf("Enter a number : ");
    scanf("%d", &n);
    num = n;
    while(num>0)
    {
        rem = num%10;
        num = num/10;
        pallindrome[l];
        l++;
    }
    x =l-1;
    for(int i = 0; i <= l/2; i++)
    {
         if(pallindrome[i] == pallindrome[x])
         {
            x--;
            f = 1;
         }
         else
         {
            f = 0;
         }
    }
    if(f==0)
    {
        printf("%d is Not Pallindrome Number.", n);
    }
    else
    {
        printf("%d is a Pallindrome Number.", n);
    }
}
 