def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """

    nums_count = {}

    for num in nums:
        nums_count[num] = nums_count.get(num, 0) + 1

    highest = max(nums_count.values())

    for (num, freq) in nums_count.items():
        if freq == highest:
            return num
