<template>
  <div v-show="dateFlag">
    <div class="mask"></div>
    <div class="date-pickers">
      <input type="text" placeholder="请选择日期" @focus="trueDateBox" :value="date1" readonly>
      <transition name="fade">
        <div class="date-box" v-if="dateBoxFlag">
          <div class="day-select">
            <div>
              <button @click="reduceYear">&laquo;</button>
              <button @click="reduceMonth">&lt;</button>
            </div>
            <div>
              <input type="text" @click="selected" v-model="year" title="年">年
              <input type="text" @click="selected" v-model="month" title="月">月
            </div>
            <div>
              <button @click="addMonth">&gt;</button>
              <button @click="addYear">&raquo;</button>
            </div>
          </div>
          <div class="day-screen">
            <div>
              <span v-for="(week,index)  in week" :key="index">{{ week }}</span>
            </div>
            <div @click="selectDay">
              <span
                v-for="(day,index) in previousMonth"
                class="previousMonth"
                :key="index"
              >{{ day }}</span>
              <span
                v-for="(day,index) in monthDay[month - 1]"
                v-bind:class="isActive(day)"
                class="currentMonth"
                :key="index"
              >{{ day }}</span>
              <span v-for="(day,index) in nextMonth" class="nextMonth" :key="index">{{ day }}</span>
            </div>
          </div>
        </div>
      </transition>
      <button class="date-sure" @click="sendDate">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "datePickers",
  data() {
    return {
      dateFlag: true,
      dateBoxFlag: true,
      year: 0,
      month: 0,
      day: 0,
      previousMonth: [],
      nextMonth: [],
      week: ["日", "一", "二", "三", "四", "五", "六"],
      monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };
  },
  created() {
    // 页面加载初始化时间
    this.trueDateBox();
  },
  computed: {
    date1() {
      if (this.year === 0 || this.month === 0 || this.day === 0) {
        return "";
      }
      return this.year + "-" + this.month + "-" + this.day;
    }
  },
  watch: {
    year: function(val) {
      let reg = /^[1-9]\d*$/g;
      if (!reg.test(val)) {
        let date = new Date();
        this.year = date.getFullYear();
      }
      if (val < 0) {
        this.year = 1;
      }
      if (val > 10000) {
        this.year = 10000;
      }
      this.dayScreen();
    },
    month: function(val) {
      let reg = /^[1-9]\d*$/g;
      if (!reg.test(val)) {
        let date = new Date();
        this.month = date.getMonth() + 1;
      }
      if (val < 1) {
        this.month = 1;
      }
      if (val > 12) {
        this.month = 12;
      }
      this.dayScreen();
    }
  },
  methods: {
    // 给父组件发送时间
    sendDate() {
      this.$emit("sendDate", this.date);
      this.dateFlag = false;
    },
    // 突出显示当前日期
    isActive(index) {
      if (index === this.day) {
        return {
          active: true
        };
      }
    },
    // 显示日期盒子并初始化
    trueDateBox() {
      if (this.date === "") {
        let date = new Date();
        this.year = date.getFullYear();
        if (this.isLeapYear(this.year)) {
          this.monthDay[1] = 29;
        } else {
          this.monthDay[1] = 28;
        }
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
      }
      this.dayScreen();
      this.dateBoxFlag = true;
    },
    // 增减年份
    addYear() {
      this.year++;
      if (this.isLeapYear(this.year)) {
        this.monthDay[1] = 29;
      } else {
        this.monthDay[1] = 28;
      }
    },
    reduceYear() {
      this.year--;
      if (this.isLeapYear(this.year)) {
        this.monthDay[1] = 29;
      } else {
        this.monthDay[1] = 28;
      }
    },
    // 增减月份
    addMonth() {
      this.month++;
      if (this.month > 12) {
        this.month = 1;
        this.year++;
      }
    },
    reduceMonth() {
      this.month--;
      if (this.month < 1) {
        this.month = 12;
        this.year--;
      }
    },
    // 获取input里的文字
    selected(e) {
      e.target.select();
    },
    // 选择日期
    selectDay(e) {
      let targetClass = e.target.className;
      if (targetClass === "previousMonth") {
        if (this.month === 1) {
          this.month = 12;
          this.year--;
        } else {
          this.month = this.month - 1;
        }
        this.day = parseInt(e.target.innerText);
      } else if (targetClass === "nextMonth") {
        if (this.month === 12) {
          this.month = 1;
          this.year++;
        } else {
          this.month = this.month + 1;
        }
        this.day = parseInt(e.target.innerText);
      } else {
        this.day = parseInt(e.target.innerText);
      }
      this.dateBoxFlag = false;
    },
    // 日期显示
    dayScreen() {
      // 上一个月
      let firstDate = new Date(this.year, this.month - 1, 1);
      let firstWeek = firstDate.getDay();
      let preMonthDay = null;
      if (this.month === 1) {
        preMonthDay = this.monthDay[11];
      } else {
        preMonthDay = this.monthDay[this.month - 2];
      }
      for (let i = 0; i < preMonthDay; i++) {
        this.previousMonth[i] = i + 1;
      }
      if (firstWeek === 0) {
        this.previousMonth = this.previousMonth.slice(-7);
      } else {
        this.previousMonth = this.previousMonth.slice(-firstWeek);
      }
      // 下一个月
      let endDate = new Date(
        this.year,
        this.month - 1,
        this.monthDay[this.month - 1]
      );
      let endWeek = endDate.getDay();
      let nextMonthDay = null;
      if (this.month === 12) {
        nextMonthDay = this.monthDay[0];
      } else {
        nextMonthDay = this.monthDay[this.month];
      }
      for (let i = 0; i < nextMonthDay; i++) {
        this.nextMonth[i] = i + 1;
      }
      if (endWeek === 6) {
        this.nextMonth = this.nextMonth.slice(0, 7);
      } else {
        this.nextMonth = this.nextMonth.slice(0, 6 - endWeek);
      }
    },
    // 判断是否是闰年
    isLeapYear(year) {
      return year % 100 === 0
        ? year % 400 === 0
          ? true
          : false
        : year % 4 === 0
        ? true
        : false;
    }
  }
};
</script>

<style lang="less">
.date {
  position: fixed;
  width: 100%;
  height: 100%;
  .date-pickers {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    > input {
      width: 98%;
      height: 20px;
      padding: 5px;
      border-radius: 0.5rem;
      border: none;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.5s;
    }
    .fade-enter,
    .fade-leave-active {
      opacity: 0;
      transform: translateY(-10px);
    }
    > div {
      width: 100%;
      border: 1px solid #eaeaea;
      border-radius: 5px;
      box-shadow: 2px 2px 2px #eee;
      background: white;
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 99;
      div.day-select {
        display: flex;
        padding: 5px 0;
        height: 30px;
        line-height: 30px;
        color: #888888;
        border-bottom: 1px solid #ccc;
        input,
        button {
          border: none;
          background: white;
          text-align: center;
          color: #888888;
          cursor: pointer;
        }
        > div:nth-child(1),
        > div:nth-child(3) {
          width: 20%;
        }
        > div:nth-child(2) {
          width: 60%;
          display: flex;
          justify-content: center;
          input:hover {
            background: #eee;
          }
          input:nth-child(1) {
            width: 50px;
          }
          input:nth-child(2) {
            width: 30px;
          }
        }
      }
      div.day-screen {
        > div {
          width: 280px;
          padding: 0 5px;
          display: flex;
          font-size: 14px;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
          }
        }
        > div:nth-child(1) {
          font-weight: bold;
          background: #f8f8f8;
        }
        > div:nth-child(2) {
          span {
            cursor: pointer;
            color: black;
            &:hover,
            &.active {
              background: #21a5ef;
              color: white;
            }
          }
          span.previousMonth,
          span.nextMonth {
            color: #888888;
          }
        }
      }
    }
    .date-sure {
      position: absolute;
      bottom: 15%;
      left: 50%;
      width: 60%;
      height: 2.5rem;
      margin-left: -30%;
      border: none;
      box-shadow: 1px 1px 10px #fff;
      background-color: #999;
      color: #fff;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.9;
  }
}
</style>
