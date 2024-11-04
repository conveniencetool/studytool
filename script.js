let goals = [];

// 目標を追加するボタンのイベントリスナー
document.getElementById('addGoalBtn').addEventListener('click', function() {
    const goalInput = document.getElementById('goal');
    const goalText = goalInput.value.trim();
    
    if (goalText) {
        goals.push({ text: goalText, progress: 0 });
        goalInput.value = '';
        updateGoalsList();
        updateProgressDisplay();
    } else {
        alert("目標を入力してください。");
    }
});

// 目標リストの表示を更新する関数
function updateGoalsList() {
    const goalsList = document.getElementById('goalsList');
    goalsList.innerHTML = '';

    goals.forEach((goal, index) => {
        const goalItem = document.createElement('div');
        goalItem.className = 'goal-item';
        goalItem.innerHTML = `
            <span>${goal.text} - 進捗: ${goal.progress}%</span>
            <button onclick="increaseProgress(${index})">進捗を追加</button>
            <button onclick="removeGoal(${index})">削除</button>
        `;
        goalsList.appendChild(goalItem);
    });
}

// 進捗を追加する関数
function increaseProgress(index) {
    if (goals[index].progress < 100) {
        goals[index].progress += 10; // 進捗を10%追加
        updateGoalsList();
        updateProgressDisplay();
    } else {
        alert("目標はすでに100%に達しています。");
    }
}

// 目標を削除する関数
function removeGoal(index) {
    goals.splice(index, 1);
    updateGoalsList();
    updateProgressDisplay();
}

// 進捗表示を更新する関数
function updateProgressDisplay() {
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
    const averageProgress = goals.length > 0 ? Math.floor(totalProgress / goals.length) : 0;
    document.getElementById('progressDisplay').textContent = `進捗: ${averageProgress}%`;
}

// 進捗をリセットするボタンのイベントリスナー
document.getElementById('resetProgressBtn').addEventListener('click', function() {
    goals = goals.map(goal => ({ ...goal, progress: 0 }));
    updateGoalsList();
    updateProgressDisplay();
});
