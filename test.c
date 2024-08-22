#include <stdio.h>

int main(){

    int input =  111111;
    int b =  input % 10;    
    input = input / 10; 
    int a =  input % 10;
    input = input / 10;
    int div =  input % 10;
    input = input / 10;
    int mult =  input % 10;
    input = input / 10;
    int sub =  input % 10;
    input = input / 10;
    int add =  input % 10;

    float result = 0.0;

    // printf("a = %d\n", a);
    // printf("b = %d\n", b);
    // printf("add = %d\n", add);
    // printf("sub = %d\n", sub);
    // printf("mult = %d\n", mult);
    // printf("div= %d\n", div);
    
    result = result + add * (a+b)  ;
    result = result + sub * (a-b)  ;
    result = result + mult * (a*b)  ;
    result = result + div * (a/b)  ;
    

    printf("result = %f\n", result);

    return 0;
}

