#include <stdio.h>
#include <stdlib.h>

int main()
{
     int n, num, rem, *arr, temp, end, start, x;
     printf("\nEnter number of elements of an array : ");
     scanf("%d", &n);
     arr = (int *)malloc(sizeof(int) * n);
     if (arr == NULL)
          printf("Memory not allocated");
     else
     {
          printf("\nEnter elements of an array : ");
          for (int i = 0; i < n; i++)
          {
               scanf("%d", arr + i);
          }
          fflush(stdin);
          printf("\nThe elements of the original array : ");
         
          for (int i = 0; i < n; i++)
          {
               printf("\n%d", *(arr + i));
          }
          /*start = 0;
          end = n-1;
          while(start<end)
          {
               temp = *(arr + start);
               *(arr + start) = *(arr + end);
               *(arr + end) = temp;
               start++;
               end--;
          }*/
         x = n-1;
         for (int i = 0; i < n/2; i++)
          {
               temp = *(arr+i);
               *(arr+i) = *(arr+x);
               *(arr+x) = temp;
               x--;
          }
          printf("\nThe elements of the reverse array : ");
          for (int i = 0; i < n; i++)
          {
               printf("\n%d", *(arr + i));
          }
     }
}
