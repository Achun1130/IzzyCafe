<template>
  <div class="container pt-4">
    <Breadcrumb :title="[$route.name]"/>
    <main class="row u-fadeIn ">
      <div class="col-sm-6 mb-3" v-for="(item, key) in locations" :key="key">
        <div class="row">
          <div class="col-lg-6 mb-3">
            <div class="u-bg-cover w-100"
              :style="{ 'background-image': `url(${require(`@/assets/images/${item.img}`)})` }"
              style="height: 200px"></div>
          </div>
          <div class="col-lg-6">
            <div class="d-lg-flex flex-lg-column justify-content-lg-center
              h-100 px-lg-0 px-sm-2 px-3">
              <a :href="item.website" target="_blank">
                <h4 class="font-weight-bold mb-3
                  u-shadow-left-title pl-3 u-underline">{{ item.name }}</h4>
              </a>
              <ul class="list-unstyled mb-0 u-fz-lg-sm">
                <li class="mb-2">
                  <a :href="item.href" target="_blank" class="u-underline">
                    <i class="fas fa-fw fa-map-marker-alt mr-1"></i>
                    {{ item.address }}
                  </a>
                </li>
                <li>
                  <span class="sr-only">營業時間：</span>
                  <ul class="pl-4">
                    <template v-if="item.weekday !== item.weekend">
                      <li class="mb-2">週一至週五：{{ item.weekday }}</li>
                      <li class="mb-2">週六至週日：{{ item.weekend }}</li>
                    </template>
                    <li class="mb-2"
                      v-if="item.weekday === item.weekend">週一至週日：{{ item.weekend }}</li>
                  </ul>
                </li>
                <li class="mb-2">
                  <a :href="'tel:+886-6-' + item.phone3 + item.phone4" class="u-underline">
                    <i class="fas fa-fw fa-mobile-alt"></i>
                    （06）{{ item.phone3 }} - {{ item.phone4 }}
                  </a>
                </li>
                <li class="mb-2" v-if="item.email">
                  <a :href="'mailto:' + item.email" class="u-underline">
                    <i class="far fa-fw mr-1 fa-envelope"></i>
                    {{ item.email }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue';
import locationsJson from '@/assets/JSON/location.json';

export default {
  name: 'Location',
  data() {
    return {
      locations: locationsJson,
    };
  },
  components: {
    Breadcrumb,
  },
};
</script>
