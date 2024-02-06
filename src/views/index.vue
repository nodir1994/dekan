<script setup lang="ts">
  //
</script>

<template>
  <div class="main-menu">
    <div class="row">
      <div class="col-md-4">
        <router-link to="/employee/teacher">
          <div class="card">
            <div class="card-body">
              <i class="mdi mdi-briefcase" style="font-size: 4rem;"></i>
            </div>
            <div class="card-footer">{{$t('Employee_Teacher')}}</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/student/special">
          <div class="card">
            <div class="card-body">
              <i class="mdi mdi-folder-star-outline" style="font-size: 4rem;"></i>
            </div>
            <div class="card-footer">{{$t('by_Specialty')}}</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/student/qualification">
          <div class="card">
            <div class="card-body">
              <i class="mdi mdi-microsoft-windows-classic" style="font-size: 4rem;"></i>
            </div>
            <div class="card-footer">{{$t('classification__groups')}}</div>
          </div>
        </router-link>
      </div>
      <!-- <div class="col-md-4">
        <router-link to="/attendance/journal">
          <div class="card">
            <div class="card-body">
              <i class="mdi mdi-list-status" style="font-size: 4rem;"></i>
            </div>
            <div class="card-footer">{{$t('attendance_Attendance_Journal')}}</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/archive/academic-note">
          <div class="card">
            <div class="card-body">
              <i class="mdi mdi-school-outline" style="font-size: 4rem;"></i>
            </div>
            <div class="card-footer">{{$t('Retraining_Academic_Record')}}</div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/messages/messageMyMessages">
          <div class="card">
            <div class="card-body">
              <i class="mdi mdi-forum" style="font-size: 4rem;"></i>
            </div>
            <div class="card-footer">{{$t('Message_My_Messages')}}</div>
          </div>
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.main-menu {
  .card {
    opacity: 0.8;
    transition: 0.3s ease;

    &:hover {
      opacity: 1;

      .card-footer {
        .footer-text {
          animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          transform: translate3d(0, 0, 0);
        }
      }
    }

    .card-body {
      // border: 3px solid #00264b;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        color: #00264b;
      }

      .card-number {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 15px;
        right: 15px;
        // border: 5px solid #a2d2ff;
        border-radius: 50%;
        background-color: #f5f5f5;
      }
    }

    .card-footer {
      text-align: center;
      background-color: #00264b;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      padding: 10px 15px;
    }
  }
}
</style>
