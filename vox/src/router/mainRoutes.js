import agentPanel from "@/assets/img/icons/agent-panel.svg";
import reports from "@/assets/img/icons/reports.svg";
import settings from "@/assets/img/icons/setting.svg";
import dashboard from "@/assets/img/icons/dashboard.svg";
import support from "@/assets/img/icons/support.svg";
import dialer from "@/assets/img/icons/dialer.svg";
export const routes = [
    {
        path: "/",
        component: () => import("@/views/Login.vue"),
        meta: { layout: "login" },
    },
    {
        path: "/agent-panel",
        component: () => import("@/views/AgentPanel.vue"),
        meta: { title: "Agent Panel", icon: agentPanel },
    },
    {
        path: "/phone",
        component: () => import("@/views/Phone/Phone.vue"),
        meta: { title: "Soft Phone", icon: agentPanel },
    },
    {
        path: "/dialer",
        component: () => import("@/views/Dialer/Dialer.vue"),
        redirect: "dialer/agents-table",
        children: [
            {
                path: "agents-table",
                component: () => import("@/views/Dialer/AgentsTable.vue"),
                meta: {
                    title: "Dialer",
                    icon: dialer,
                },
            },
        ],
    },
    {
        path: "/reports",
        component: () => import("@/views/Reports/Reports.vue"),
        redirect: "/reports/call-history",
        children: [
            {
                path: "call-history",
                component: () => import("@/views/Reports/CDR/CDR.vue"),
                meta: { title: "Reports", icon: reports },
            },
            {
                path: "billing/charges",
                component: () => import("@/views/Reports/BillingReports/Charges.vue"),
                meta: { title: "Reports", icon: reports },
            },
            {
                path: "billing",
                component: () => import("@/views/Reports/BillingReports/Statement.vue"),
                meta: { title: "Reports", icon: reports },
            },
            {
                path: "billing/payments",
                component: () => import("@/views/Reports/BillingReports/Payments.vue"),
                meta: { title: "Reports", icon: reports },
            },
        ],
    },
    {
        path: "/config",
        component: () => import("@/views/Config/Config.vue"),
        redirect: "/config/users",
        children: [
            {
                path: "users",
                component: () => import("@/views/Config/Users/Users.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "users/create-user",
                component: () => import("@/views/Config/Users/CreateUser/CreateUser.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "users/account-info/:id",
                component: () => import("@/views/Config/Users/Accountinfo/Accountinfo.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "users/edit-user/:id",
                component: () => import("@/views/Config/Users/EditUser/EditUser.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "departments",
                component: () => import("@/views/Config/Departments/Departments.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "departments/create-department",
                component: () => import("@/views/Config/Departments/CreateDepartment/CreateDepartment.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "departments/department-setting/:id",
                component: () => import("@/views/Config/Departments/DepartmentSettings/DepartmentSettings.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "external-numbers",
                component: () => import("@/views/Config/Numbers/WrapNumbers"),
                redirect: "external-numbers/info",
                children: [
                    {
                        path: "info",
                        component: () => import("@/views/Config/Numbers/Numbers.vue"),
                        meta: { title: "Settings", icon: settings },
                    },
                    {
                        path: "departments",
                        component: () => import("@/views/Config/Numbers/NumbersOfDepartments.vue"),
                        meta: { title: "Settings", icon: settings },
                    },
                ],
            },

            {
                path: "queues",
                component: () => import("@/views/Config/Queues/Queues.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "queues/create-queue",
                component: () => import("@/views/Config/Queues/CreateQueue/CreateQueue.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "queues/queue-setting/:id",
                component: () => import("@/views/Config/Queues/QueuesSettings/QueuesSettings.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "incoming-route",
                component: () => import("@/views/Config/Scenarios/ParentScenario.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "whitelistIP",
                component: () => import("@/views/Config/WhitelistIP/WhitelistIP.vue"),
                meta: { title: "Settings", icon: settings },
            },
            {
                path: "outboundCalls",
                component: () => import("@/views/Config/OutboundCalls/OutboundCalls.vue"),
                meta: { title: "Settings", icon: settings },
            },
        ],
    },
    {
        path: "/dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue"),
        redirect: "dashboard/agents-map",
        children: [
            {
                path: "agents-map",
                component: () => import("@/views/Dashboard/AgentsMap.vue"),
                meta: { title: "Dashboard", icon: dashboard },
            },
        ],
    },
    {
        path: "/support",
        component: () => import("@/views/Support/Manual.vue"),
        redirect: "/support/manual",
        children: [
            {
                path: "manual",
                component: () => import("@/views/Support/Manual.vue"),
                meta: { title: "Support", icon: support },
            },
        ],
    },
];

