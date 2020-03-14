---
title: 算法
sidebar: auto
pageClass: data-algorithm
---

## 排序算法说明

1. 对于评述算法优劣术语的说明

- 稳定：如果 a 原本在 b 前面，而 a=b，排序之后 a 仍然在 b 的前面；
- 不稳定：如果 a 原本在 b 的前面，而 a=b，排序之后 a 可能会出现在 b 的后面；

- 内排序：所有排序操作都在内存中完成；
- 外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

- 时间复杂度: 一个算法执行所耗费的时间。
- 空间复杂度: 运行完一个程序所需内存的大小。

2. 排序算法图片总结

![排序算法图片总结](/images/sort.png)

### 冒泡排序

解析：

1. 比较相邻的两个元素，如果前一个比后一个大，则交换位置。

2. 第一轮的时候最后一个元素应该是最大的一个。

3. 按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。

```js
function sort(ary) {
  for (let i = 0; i < ary.length - 1; i++) {
    for (let k = 0; k < ary.length - i - 1; k++) {
      if (ary[k] > ary[k + 1]) {
        [ary[k], ary[k + 1]] = [ary[k + 1], ary[k]];
      }
    }
  }
  return ary;
}
```

### 快速排序

解析：快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。

```js
function quickSort(ary) {
  if (ary.length <= 1) return ary;
  let middleIndex = Math.floor(ary.length / 2),
    middleItem = ary.splice(middleIndex, 1)[0],
    leftAry = [],
    rightAry = [];

  for (let i = 0; i < ary.length; i++) {
    if (ary[i] < middleItem) {
      leftAry.push(ary[i]);
    } else {
      rightAry.push(ary[i]);
    }
  }
  return quickSort(leftAry).concat([middleItem], quickSort(rightAry));
}
```

### 插入排序

解析：

（1） 从第一个元素开始，该元素可以认为已经被排序

（2） 取出下一个元素，在已经排序的元素序列中从后向前扫描

（3） 如果该元素（已排序）大于新元素，将该元素移到下一位置

（4） 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置

（5）将新元素插入到下一位置中

（6） 重复步骤 2

```js
function insertSort(ary) {
  for (let i = 1; i < ary.length; i++) {
    if (ary[i] < ary[i - 1]) {
      let guard = ary[i];
      let j = i - 1;
      ary[i] = ary[j];
      while (j >= 0 && guard < ary[j]) {
        ary[j + 1] = ary[j];
        j--;
      }
      ary[j + 1] = guard;
    }
  }
  return ary;
}
```

### 二分查找

解析：二分查找，也为折半查找。首先要找到一个中间值，通过与中间值比较，大的放右，小的放在左边。再在两边中寻找中间值，持续以上操作，直到找到所在位置为止。

```js
function binarySearch(data, dest, startIndex, endIndex) {
  let end = endIndex || data.length - 1,
    start = startIndex || 0,
    m = Math.floor((start + end) / 2);

  if (data[m] === dest) {
    return m;
  }
  if (dest < data[m]) {
    return binarySearch(data, dest, 0, m - 1);
  } else {
    return binarySearch(data, dest, m + 1, end);
  }
  return false;
}
```

### 选择排序

解析: 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

以此类推，直到所有元素均排序完毕。

```js
function selectionSort(ary) {
  let len = ary.length,
    minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let k = i + 1; k < len; k++) {
      if (ary[k] < ary[minIndex]) {
        minIndex = k;
      }
    }
    [ary[i], ary[minIndex]] = [ary[minIndex], ary[i]];
  }
  return ary;
}
```
