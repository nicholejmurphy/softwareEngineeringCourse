def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """

    fixed_phrase = phrase.lower().replace(' ', '')

    return fixed_phrase == fixed_phrase[::-1]


is_palindrome('taco cat')
is_palindrome('Noon')
is_palindrome('noon')
is_palindrome('tacocat')
is_palindrome('robert')
