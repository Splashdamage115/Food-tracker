import 'package:flutter/material.dart';

class DailySummaryCard extends StatelessWidget {
  final Map<String, double> summary;

  const DailySummaryCard({
    super.key,
    required this.summary,
  });

  @override
  Widget build(BuildContext context) {
    final calories = summary['calories'] ?? 0;
    final protein = summary['protein'] ?? 0;
    final carbs = summary['carbs'] ?? 0;
    final fat = summary['fat'] ?? 0;

    // Mock daily goals - in production, these would come from user settings
    const calorieGoal = 2000.0;
    const proteinGoal = 100.0;
    const carbsGoal = 250.0;
    const fatGoal = 70.0;

    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Daily Summary',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildProgressRow(
              context,
              'Calories',
              calories,
              calorieGoal,
              'kcal',
              Colors.orange,
            ),
            const SizedBox(height: 12),
            _buildProgressRow(
              context,
              'Protein',
              protein,
              proteinGoal,
              'g',
              Colors.red,
            ),
            const SizedBox(height: 12),
            _buildProgressRow(
              context,
              'Carbs',
              carbs,
              carbsGoal,
              'g',
              Colors.blue,
            ),
            const SizedBox(height: 12),
            _buildProgressRow(
              context,
              'Fat',
              fat,
              fatGoal,
              'g',
              Colors.purple,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressRow(
    BuildContext context,
    String label,
    double current,
    double goal,
    String unit,
    Color color,
  ) {
    final percentage = goal > 0 ? (current / goal).clamp(0.0, 1.0) : 0.0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
            Text(
              '${current.toInt()} / ${goal.toInt()} $unit',
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: percentage,
            minHeight: 8,
            backgroundColor: color.withOpacity(0.2),
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),
      ],
    );
  }
}
