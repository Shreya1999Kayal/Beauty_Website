//NUMBER OF LETTERS IN NAME
#include <stdio.h>
#define SIZE 50
void input(char[]);
int main()
{
    char name[SIZE];
    printf("Enter name:");
    gets(name);
   input(name);
   return 1; 
}

void input(char nm[])
{
    int c = 0, d=0;
    while(nm[c]!='\0')
    c++;
    //printf("\n Name : %s \n No of letters: %d", nm, c);
    while(d<c)
    printf("%c", nm[d++]);
}


