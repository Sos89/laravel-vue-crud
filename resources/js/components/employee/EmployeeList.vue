<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Employee Component</div>

                    <div class="card-body">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                Employee Data
                                <a href="/add-employee">
                                    <el-button
                                        type="success"
                                        class="float-right"
                                        @click=""
                                    >
                                        Add Employee
                                    </el-button>
                                </a>

                            </div>
                            <div>
                                <el-table
                                    :data="tableData"
                                    style="width: 1200px"
                                    :border="true"
                                    height="500">

                                    <el-table-column
                                        v-for="column in tableColumns"
                                        :key="column.label"
                                        :label="column.label"
                                        :prop="column.prop"
                                        :column-key="column.prop"
                                        :min-width="column.minWatch"
                                        :sortable="column.sortable"
                                        :align="column.align"
                                        :header-align="column.align"
                                        :type="column.type"
                                    >

                                    </el-table-column>
                                    <el-table-column
                                        align="right"
                                        min-width="100"
                                    >
                                        <template slot="header" slot-scope="scope">
                                            <el-input
                                                v-model="search"
                                                size="mini"
                                                placeholder="Type Search Here" />
                                        </template>
                                        <template slot-scope="scope" >
                                            <el-button
                                                size="mini"
                                                type="info"
                                                @click="showEmployee(scope.$index, scope.row)">
                                                Show
                                            </el-button>
                                            <el-button
                                                size="mini"
                                                type="success"
                                                @click="editEmployee(scope.$index, scope.row)">
                                                Edit
                                            </el-button>
                                            <el-button
                                                size="mini"
                                                type="danger"
                                                @click="deleteEmployee(scope.$index, scope.row)">
                                                Delete
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  { mapGetters } from 'vuex'
export default {
    name: 'employee-form',
    props: {
        scope:String,
        id:Number,
    },
    data() {
        return {
            search: null,
            form: {
                name: null,
                department: null,
                section: null,
                email: null
            },
            tableColumns: [
                {
                    prop: 'name',
                    label: 'Name',
                    minWatch: 80,
                    sortable: false,
                    hidden: true,
                    align: "center",
                    fixed: true
                },
                {
                    prop: 'department',
                    label: 'Department',
                    minWatch: 80,
                    sortable: false,
                    hidden: true,
                    align: "center",
                    fixed: true
                },
                {
                    prop: 'section',
                    label: 'Section',
                    minWatch: 80,
                    sortable: false,
                    hidden: true,
                    align: "center",
                    fixed: true
                },
                {
                    prop: 'email',
                    label: 'Email',
                    minWatch: 80,
                    sortable: false,
                    hidden: true,
                    align: "center",
                    fixed: true,
                    type: 'email'
                },
            ]
        }
    },
    watch: {
        search: function (keyword) {
            this.$store.dispatch('getEmployeesData', {searchQuery: this.search })
        }
    },
    mounted() {
        const loading = this.$loading({
            lock: true,
            text: 'loading...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.85)'
        });

        this.$store.dispatch('getEmployeesData', {searchQuery: this.search })
        loading.close();
    },
    computed:{
        ...mapGetters({
            tableData:"tableData"
        })
    },
    methods: {
        editEmployee(index, row){
            window.location.href="/edit-employee/"+row.id+'/edit';
        },
        showEmployee(index, row){
            window.location.href="/show-employee/"+row.id;
        },
        deleteEmployee(index, row){
            this.$confirm('Are you sure, You want to delete this employee', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('deleteEmployee', {
                    id: row.id
                });
                this.$store.dispatch('getEmployeesData')

                this.$message({
                    type: 'success',
                    message: 'Delete completed'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        }
    }
}
</script>

<style scoped>
.float-right{
    float: right;
}
</style>
