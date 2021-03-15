<template>
  <v-app>
    <div>
      <nuxt></nuxt>
      <Dialog/>
    </div>
  </v-app>
</template>


<script>
import Dialog from '~/components/Dialog'

export default {
  components: {
    Dialog
  }
}
</script>

<style lang="scss">
    .v-application{
      font-family: 'Quicksand', sans-serif;
    }
    .v-toolbar__title{
      text-align: center;
      width: 100%;
      font-weight: bold;
    }
    .v-application .primary{
      background-color: #1723be !important;
      border-color: #1723be !important;
    }
    .text-primary{
      color: #1723be;
    }
    .text-main{
      font-size: 20px;
    }
    .text-title{
      font-size: 20px;
      font-weight: bold;
    }
    .w-100{
      width:100%;
    }
    .my-btn{
      font-size: 25px !important;
      text-transform: none !important;
      height: auto !important;
      padding: 10px 0 !important;
      min-height: 50px;
      &.outlined{
        border: 1px solid #1723be;
        border-radius: 28px;
        line-height: normal;
      }
    }
</style>