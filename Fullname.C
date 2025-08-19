// input - first name, last name; output - full name
#include <stdio.h>
#define SIZE 50
void input(char[], char[]);
int main()
{
    char fname[SIZE], lname[SIZE];
    printf("\nEnter first name:");
    gets(fname);
    printf("\nEnter last name:");
    gets(lname);
    input(fname, lname);
    return 1;
}

void input(char first[], char last[])
{
    int c = 0, d = 0;
    char fullname[50];

    while (first[c] != '\0')
    {
        fullname[c] = first[c];
        c++;
    }
    fullname[c] = ' ';
    c++;
    while (last[d] != '\0'){
        fullname[c++] = last[d++]; 
    }
   
    fullname[c] = '\0';
    printf("\n Full Name : %s \n No of letters: %d", fullname, c);
}

