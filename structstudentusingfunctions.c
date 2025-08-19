/*student menu driven -
1. insert new student having name, roll, eng maks, maths marks. roll auto generated
2. display all students- name, roll, eng maks, maths marks, percentage, remarkks
3. Display specific students : only details of roll given by user will be displayed
*/

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
int i = 0;
// To insert new student details
struct Student newStudent(struct Student s[])
{
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
    s[i].average = (s[i].eng + s[i].maths) / 2;
    if (s[i].average > 90)
        strcpy(s[i].remarks, "Excellent");
    else if (s[i].average > 80)
        strcpy(s[i].remarks, "Very Good");
    else if (s[i].average > 60)
        strcpy(s[i].remarks, "Good");
    else if (s[i].average > 50)
        strcpy(s[i].remarks, "Average");
    else
        strcpy(s[i].remarks, "Fail");

    i++;

    return s[i];
}

// to display details of all students
void displayAllStudents(struct Student s[])
{
    printf("\n 2. Display all students : ");
    for (int j = 0; j < i; j++)
    {

        printf(" \n\nName: %s", s[j].name);
        printf(" \nRoll: %d", s[j].roll);
        printf(" \nEng Marks: %0.2f", s[j].eng);
        printf(" \nMaths Marks: %0.2f", s[j].maths);
        printf("\nPercentage = %0.2f", s[j].average);
        printf(" \nRemarks: %s", s[j].remarks);
    }
}
// to display details of a specific student whose roll no is given by user
void displaySpecificStudents(struct Student s[])
{
    int j, f = 0;
    printf("\n 3. Display specific students : ");
    printf(" \nEnter the RollNo of the student whose details are to be searched : ");
    scanf("%d", &j);
    for (int k = 0; k < i; k++)
    {

        if (s[k].roll == j)
        {
            printf(" \n\nName: %s", s[j - 1].name);
            printf(" \nRoll: %d", s[j - 1].roll);
            printf(" \nEng Marks: %0.2f", s[j - 1].eng);
            printf(" \nMaths Marks: %0.2f", s[j - 1].maths);
            printf("\nPercentage = %0.2f", s[j - 1].average);
            printf(" \nRemarks: %s", s[j - 1].remarks);
            f = 1;
        }
    }
    if (f == 0)
        printf("Roll No does not exist");
}

void displayHighestStudent(struct Student s[])
{
    float max = 0;
    int id=0, j = 0;
      while(j < i)
      {
           if (s[j].average>max){
           id = j;
           max = s[j].average;
           }
           j++;
      }
      printf(" \n\nName: %s", s[id].name);
        printf(" \nRoll: %d", s[id].roll);
        printf(" \nEng Marks: %0.2f", s[id].eng);
        printf(" \nMaths Marks: %0.2f", s[id].maths);
        printf("\nPercentage = %0.2f", s[id].average);
        printf(" \nRemarks: %s", s[id].remarks);

}
int main()
{
    struct Student s[50];
    //struct Student t[50];

    int ch, con, j = 0;
    char remarks[50];
    do
    {
        printf("\n 1. Insert new student : ");
        printf("\n 2. Display all students : ");
        printf("\n 3. Display specific students : ");
        printf("\n 4. Highest student details : ");

        printf("\nEnter your choice between 1-3 : ");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            newStudent(s);
            break;
        case 2:
            displayAllStudents(s);
            break;

        case 3:
            displaySpecificStudents(s);
            break;

        case 4:
            displayHighestStudent(s);
            break;

        default:
            printf("\n Wrong input. ");
            break;
        }
        printf("\n If you want to continue, press 1. ");
        scanf("%d", &con);
    } while (con == 1);
}
