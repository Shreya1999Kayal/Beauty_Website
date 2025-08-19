
#include <stdio.h>
// with return with parameter
int larger[100], k = 0;
int parameter(int a[], int x, int n)
{
  int sum = 0;
  for (int i = 0; i < n; i++)
  {
    if (a[i] > x)
    {
      larger[k++] = a[i];
      sum = sum + a[i];
    }
  }
  return sum;
}

int main()
{
  /* code */
  int n, x, sum, i;
  printf("\nEnter the size of array:");
  scanf("%d", &n);
  int arr[n];
  printf("\nEnter the elements:");
  for (i = 0; i < n; i++)
  {
    scanf("%d", &arr[i]);
  }
  printf("\nEnter the element to be searched:");
  scanf("%d", &x);
  sum = parameter(arr, x, n);
  printf("\nThe elements greater than  : %d\n ", x);
  for (i = 0; i < k; i++)
  {
    printf("\n%d", larger[i]);
  }
  printf("\nThe sum is : %d ", sum);

  return 0;
}
