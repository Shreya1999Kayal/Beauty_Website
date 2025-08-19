#include <stdio.h>
#include <string.h>
struct Student
{
    char name[50];
    int roll;
    float eng;
    float maths;
    float average;
    char remarks[50];
};



int main()
{
    struct Student s[50];
    int ch,  i = 0, n =0, con, num;
    char remarks[50];
    do
    {
        printf("\n 1. Insert new student : ");
        printf("\n 2. Display all students : ");
        printf("\n 3. Display specific students : ");

        printf("\nEnter your choice between 1-3 : ");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("\n 1. Insert new student : ");
            printf("\nEnter name:");
            scanf("%s", s[i].name);
            fflush(stdin);
            s[i].roll = i + 1;
            fflush(stdin);
            printf("\nEnter marks of eng:");
            scanf("%f", &s[i].eng);
            fflush(stdin);
            printf("\nEnter marks of maths:");
            scanf("%f", &s[i].maths);
            fflush(stdin);
            printf("\n");
            i++;
            break;
        case 2:
            printf("\n 2. Display all students : ");
            for (int j = 0; j < i; j++)
            {

                printf(" \n\nName: %s", s[j].name);
                printf(" \nRoll: %d", s[j].roll);
                printf(" \nEng Marks: %0.2f", s[j].eng);
                printf(" \nMaths Marks: %0.2f", s[j].maths);

                s[j].average = (s[j].eng + s[j].maths) / 2;
                printf("\nPercentage = %0.2f", s[j].average);
                if (s[j].average > 90)
                    strcpy(s[j].remarks, "Excellent");
                else if (s[j].average > 80)
                    strcpy(s[j].remarks, "Very Good");
                else if (s[j].average > 60)
                    strcpy(s[j].remarks, "Good");
                else if (s[j].average > 50)
                    strcpy(s[j].remarks, "Average");
                else
                    strcpy(s[j].remarks, "Fail");
                printf(" \nRemarks: %s", s[j].remarks);
            }
            break;

        case 3:
            printf("\n 3. Display specific students : ");
            printf(" \n Enter no of students details you want to put: ");
            scanf("%d", &num);
            for (int k = 0; k < num; k++)
            {
                printf(" \nEnter the RollNo of the student whose details are to be searched : ");
                scanf("%d", &n);
                printf(" \n\nName: %s", s[n-1].name);
                printf(" \nRoll: %d", s[n-1].roll);
                printf(" \nEng Marks: %0.2f", s[n-1].eng);
                printf(" \nMaths Marks: %0.2f", s[n-1].maths);
                printf(" \nRemarks: %s", s[n-1].remarks);
            }

            break;

        default:
            printf("\n Wrong input. ");
            break;
        }
        printf("\n If you want to continue, press 1. ");
        scanf("%d", &con);
    } while (con == 1);
}
