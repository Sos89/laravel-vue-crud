<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Employee Component</div>

                    <div class="card-body">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <el-page-header @back="goBack" :content="`${ scope } form`">

                                </el-page-header>
                            </div>
                            <div>
                                <el-form ref="employeeForm" :model="form" >
                                    <el-row :duuter="10">
                                        <el-form-item
                                            label="Name" required prop="name"
                                        >
                                            <el-input
                                                v-model="form.name"
                                                :readonly="readOnlyField"
                                                aria-placeholder="Employee Name"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Department" required prop="department"
                                        >
                                            <el-input
                                                v-model="form.department"
                                                :readonly="readOnlyField"
                                                aria-placeholder="Department Name"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Section" required prop="section"
                                        >
                                            <el-input
                                                v-model="form.section"
                                                :readonly="readOnlyField"
                                                aria-placeholder="Section Name"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Email" required prop="email"
                                        >
                                            <el-input
                                                v-model="form.email"
                                                :readonly="readOnlyField"
                                                aria-placeholder="Email Address"
                                            />
                                        </el-form-item>
                                    </el-row>
                                    <el-row :gutter="10">
                                        <el-form-item >
                                            <el-button v-if="scope != 'show'" type="success" @click="saveForm('employeeForm')"> Save </el-button>
                                        </el-form-item>
                                    </el-row>
                                </el-form>
                            </div>
                        </el-card>.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'employee-form',
    props: {
        scope:String,
        id:Number,
    },
    mounted(){
        if (this.scope == 'edit' || this.scope == 'show') {
            axios.get(`/fetch-employee-data/${this.id}`).then(res => {
                this.$set(this, 'form', res.data.data);
            })
        }
    },
    computed: {
        readOnlyField() {
            return this.scope == 'show' ? true : false;
        }
    },
    data() {
        return {
            form: {
                name: null,
                department: null,
                section: null,
                email: null
            }
        }
    },
    methods: {
        goBack() {
            window.location.href = '/employees'
        },
        saveForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.scope == 'create')
                    {
                        this.$store.dispatch('saveEmployee', this.form);
                    }
                    else
                    {
                        this.$store.dispatch('updateEmployee',
                            {
                                id: this.id,
                                form: this.form
                            });
                    }
                }
            })
        }
    },

}
</script>
