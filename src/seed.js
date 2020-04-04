const { exec } = require("child_process");

exec("docker exec -i mysql mysql -utemp_user -pmysql teacher_admin < ./init.sql", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});