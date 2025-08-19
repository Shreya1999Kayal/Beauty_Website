// Pointer concept
#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>

int main(){
    int *p, n, c;
    printf("Enter how many numbers you want: ");
    scanf("%d",&n);
    p = (int *) malloc(sizeof(int)*n);
    if(p == NULL){
        printf("\nMemory not allocated");
        exit(1);
    }
    for(c=0;c<n;c++){
        printf("\nEnter the number: ");
        scanf("%d",p+c);
    }
    for(c=0;c<n;c++){
        printf("\nvalue of %d is %d and address is %x and address in p format is %p ",(c+1),*(p+c), p+c, p+c);
    }
    free(p);
    return 0;
}