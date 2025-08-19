/* use of do while to print
      1
    1 2
  1 2 3
1 2 3 4*/
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int r, c, s, n, ch;

    ch = 1;
    do
    {
        printf("Enter the number of rows:");
        scanf("%d", &n);
        for (r = 1; r <= n; r++)
        {
            for (s = r; s < n; s++)
            {
                printf(" ");
            }

            for (c = 1; c <= r; c++)
            {
                printf("%d", c);
            }
            printf("\n");
        }

        printf("\n Press 1 to continue or 0 to exit: ");
        scanf("%d", &ch);
    } while (ch == 1);
    return 0;
}
