import { h, Transition, isVue2 } from 'vue-demi'

// fade
import '@/styles/transitions/fade/fade.sass';
import '@/styles/transitions/fade/fade-in-down.sass';
import '@/styles/transitions/fade/fade-in-right.sass';
import '@/styles/transitions/fade/fade-in-up.sass';
import '@/styles/transitions/fade/fade-in-left.sass';
// zoom
import '@/styles/transitions/zoom/zoom.sass';
// flip
import '@/styles/transitions/flip/flip-x.sass';
import '@/styles/transitions/flip/flip-y.sass';
// overlay
import '@/styles/transitions/overlay/overlay-right.sass';
import '@/styles/transitions/overlay/overlay-down.sass';
import '@/styles/transitions/overlay/overlay-up.sass';
import '@/styles/transitions/overlay/overlay-left.sass';
import '@/styles/transitions/overlay/overlay-up-full.sass';
import '@/styles/transitions/overlay/overlay-right-full.sass';
import '@/styles/transitions/overlay/overlay-down-full.sass';
import '@/styles/transitions/overlay/overlay-left-full.sass';
import '@/styles/transitions/overlay/overlay-up-down.sass';
import '@/styles/transitions/overlay/overlay-left-right.sass';

export default {
  name: 'vue-page-transition',
  props: ['name'],
  data () {
    return {
      transition: 'fade',
      mode: 'out-in',
    }
  },
  render () {
    // <div>
    //   <Transition
    //     :name="transition"
    //     :mode="mode"
    //   >
    //     <Slot></Slot>
    //   </Transition>
    //   <div class="overlay-top"></div>
    //   <div class="overlay-right"></div>
    //   <div class="overlay-bottom"></div>
    //   <div class="overlay-left"></div>
    // </div>
    if (isVue2) {
      return {}
    } else {
      return h('div', [
        h(Transition, {
            name: this.transition,
            mode: this.mode,
        }, this.$slots.default),
        h('div', {
          class: 'overlay-top',
        }),
        h('div', {
          class: 'overlay-right',
        }),
        h('div', {
          class: 'overlay-bottom',
        }),
        h('div', {
          class: 'overlay-left',
        }),
      ])
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.transition = to.meta.transition
        ? to.meta.transition
        : this.$props.name
      next()
    })
  }
}
