// My program of replacing an item if found in the array
/*#include <stdio.h>
#include <stdlib.h>
void func(int arr[], int n, int ch)
{
    int x, f = 0, i;
    for (i = 0; i < n; i++)
    {
        if (arr[i] == ch)
        {
            f = 1;
            printf("\n Press 1 to replace or 0 to continue: ");
            scanf("%d", &x);
            if (x == 1)
            {
                printf("\n Enter the element for index %d : ", i + 1);
                scanf("%d", &arr[i]);
            }
        }
    }
    if (f == 0)
    {
        printf("\n %d does not exist. ", ch);
    }
    else
    {
        printf("The updated elements are:\n ");
        for (i = 0; i < n; i++)
        {
            printf("%d  ", arr[i]);
        }
    }
}

int main()
{
    int n, i, ch;
    printf("Enter the number of elements:");
    scanf("%d", &n);
    int arr[n];

    for (i = 0; i < n; i++)
    {
        printf("\n Enter the element for %d : ", i + 1);
        scanf("%d", &arr[i]);
    }
    printf("Enter the element to be searched:");
    scanf("%d", &ch);
    func(arr, n, ch);
    return 0;
} */

//// Sir program of replacing an item if found in the array
#include <stdio.h>
#include <stdlib.h>
#define MAX 100

int find_replace(int arr[], int size, int item){
    int c, status=0, x;
    for(c=0;c<size;c++){
        if(arr[c] == item){
            status = 1;
            printf("\nPress 0 to continue or 1 to change: ");
            scanf("%d",&x);
            if(x==1){
                printf("\nEnter the new number: ");
                scanf("%d",&arr[c]);
            }
        }
    }
    if(status)
        return 1;
    else
        return 0;
}

int main(){
    int arr[MAX], c, item, s, status;
    printf("Enter the size of the array: ");
    scanf("%d",&s);

    for(c=0;c<s;c++){
        printf("\nEnter the item for %d: ",(c+1));
        scanf("%d",&arr[c]);
    }

    printf("\nEnter the search number: ");
    scanf("%d",&item);

    status = find_replace(arr,s,item);
    if(status){
        for(c=0;c<s;c++){
            printf("\nData at %d is: %d",(c+1),arr[c]);
        }
    } else {
        printf("\n%d is not present",item);
    }
    return 0;
}