#include <stdio.h>
#include <string.h>


int main() {
    int n, l = 0, rem, pallindrome[100], x, f = 1, num;
    printf("Enter a number : ");
    scanf("%d", &n);
    num = n;
    while(num>0)
    {
        rem = num%10;
        num = num/10;
        pallindrome[l]=rem;
        l++;
    }
    x =l;
    for(int i = 0; i <= l/2; i++)
    {
         if(pallindrome[i] != pallindrome[--x])
         {
            f = 0;
            break;
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
 