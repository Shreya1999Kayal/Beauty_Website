#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define size 100

// to search a substring and find its starting and end index
void search_substring(char str[])
{
      char sub[100];
      int x,c=0, c2=0, f=0,l;
     fflush(stdin);
      //c2 is length of the sub string
      printf("\nEnter a sub string : ");
      gets(sub);
      fflush(stdin);
      while(sub[c2]!='\0')
      {
          c2++;
      }
      for(int i = 0; str[i]!='\0'; i++)
      {
        c=0;
        for(int j = i; j<i+c2; j++){
           if(str[j] != sub[c])
           {
                f = 0;
                break;
           }
           else{
                f = 1;
                l = i;
           }
           c++;
        }
        if(c==c2)
        {
          break;
        }

      }
      fflush(stdin);
      if(f==0)
      {
          printf("\n%d Not Found ");
          fflush(stdin);
      }
      else{
         printf("\n%s Found in starting index %d and end index %d in %s  ", sub, l, l+c2-1, str);
      }
      fflush(stdin);
}

// to count number of vowels and consonents 
void vowels_consonents(char str[])
{
     int vowels=0, consonents=0;
     for(int i = 0; str[i]!='\0'; i++)
      {
          if(str[i] == 'a' || str[i] == 'e' || str[i] == 'i' || str[i] == 'o' || str[i] == 'u'||
            str[i] == 'A' || str[i] == 'E' || str[i] == 'I' || str[i] == 'O' || str[i] == 'U' )
          {
               vowels++;
          }
          else if(str[i] == 'b' || str[i] == 'c' || str[i] == 'd' || str[i] == 'f' || str[i] == 'g' ||
            str[i] == 'h' || str[i] == 'j' || str[i] == 'k' || str[i] == 'l' || str[i] == 'm' ||
            str[i] == 'n' || str[i] == 'p' || str[i] == 'q' || str[i] == 'r' || str[i] == 's' ||
            str[i] == 't' || str[i] == 'v' || str[i] == 'w' || str[i] == 'x' || str[i] == 'y' || str[i] == 'z' ||
            str[i] == 'B' || str[i] == 'C' || str[i] == 'D' || str[i] == 'F' || str[i] == 'G' ||
            str[i] == 'H' || str[i] == 'J' || str[i] == 'K' || str[i] == 'L' || str[i] == 'M' ||
            str[i] == 'N' || str[i] == 'P' || str[i] == 'Q' || str[i] == 'R' || str[i] == 'S' ||
            str[i] == 'T' || str[i] == 'v' || str[i] == 'W' || str[i] == 'X' || str[i] == 'Y' || str[i] == 'Z')
          {
               consonents++;
          }
      }
      fflush(stdin);
      if(vowels == 0)
      {
          printf("\nNo vowel is present.");
      }
      else
      {
          printf("\n%d vowels are present.", vowels);
      }
      fflush(stdin);
      if(consonents == 0)
      {
          printf("\nNo consonent is present.");
          fflush(stdin);
      }
      else
      {
          printf("\n%d consonents are present.", consonents);
      }
      fflush(stdin);

}

// to search number of times a word appears
void search_word(char str[])
{
     char word[50], check[50], convert[100];
     int k = 0, c = 0, index, w = 0, x, i;
     fflush(stdin);
     printf("\nEnter a word : ");
     gets(word);
     fflush(stdin);
     while(word[c]!='\0')
      {
          c++;
      }
     for (i = 0; str[i] != '\0'; i++)
     {
          x = str[i];
          if(x >= 65 && x <= 90)
          {
               convert[i] = str[i]+32;
          }
          else
          {
              convert[i] = str[i]; 
          } 
 
     }
     convert[i] = '\0';

     for (i = 0; convert[i] != '\0'; i++)
     {
          k = 0;
          for (int j = i; j<i+c; j++)
          {
               if (convert[j] == ' ')
               {
                    break;
               }
               else
               {
                    check[k] = convert[j];
                    index = i;
                    k++;;
               }

          }
          if(strcmp(check,word)==0)
          {
               w++;
          }
     }
     
     if(w==0)
     {
          printf("%s does not found in %s" , word, str);
          
     }
     else{
          printf("%s occurs %d times in %s" ,word, w, str);
          
     }

}

int main()
{
    char str[size];
    int ch, s=1;
    fflush(stdin);
    printf("\nEnter a string:");
    gets(str);
    fflush(stdin);
    do
    {
     /* code */
       
    printf("\n\n1. Press 1 to count number of times a word is presnt.");
    printf("\n2. Press 2 to count number of vowels & Consonents.");
    printf("\n3. Press 3 to Search Substring index.");
    printf("\nEnter your choice :");
    scanf("%d", &ch);
    fflush(stdin);
    switch (ch)
    {
    case 1:
        search_word(str);
        break;
    case 2:
        vowels_consonents(str);
        break;
    case 3:
        search_substring(str);
        break;
    default:
        printf("\nInvalid choice");
    }
      fflush(stdin);
      printf("\nIf you want to continue, press 1.");
      scanf("%d", &s);
      fflush(stdin);
    } while (s==1);

    return 0;
}


