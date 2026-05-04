namespace StudentsApi.Models
{
    public class Student
    {
        public long Id { get; set; }
        public int Index { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}