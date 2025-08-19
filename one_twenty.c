#include<stdio.h>
int main()
{
    /* code */
    for(int i = 1; i <= 20; i++)
    {
        if(i%5==0)
        {
            continue;
        }
        printf("%d",i);
        printf("\n");
        

    }
    return 0;
}

