using System.Text.Json;
using System.IO;

namespace Services
{
  public interface IRegistrationService
  {
    void Register(Person person);
    IEnumerable<StoragePerson> GetAll();
  }
  public class Person
  {
    public string Name { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
  }

  public class StoragePerson  : Person
  {
    public Guid Id { get; set; }
  }
  public class RegistrationService : IRegistrationService
  {
    private const string storagePath = "./storage";
    public RegistrationService()
    {

    }

    public void Register(Person person)
    {
      var r = new Random();
      var newPerson = new StoragePerson
      {
        Id = Guid.NewGuid(),
        Age = person.Age,
        LastName = person.LastName,
        Name = person.Name
      };
      var serializedPerson = JsonSerializer.Serialize(newPerson);
      if (!Directory.Exists(storagePath))
      {
        Directory.CreateDirectory(storagePath);
      }
      File.WriteAllText($"{storagePath}/person-{newPerson.Id}.json", serializedPerson);
    }

    public IEnumerable<StoragePerson> GetAll()
    {
      var people = new List<StoragePerson>();
      if (Directory.Exists(storagePath))
      {
        var files = Directory.EnumerateFiles(storagePath);
        foreach (var file in files)
        {
          var serializedPerson = File.ReadAllText(file);
          var person = JsonSerializer.Deserialize<StoragePerson>(serializedPerson);
          if (person != null)
            people.Add(person);
        }
      }
      return 
        people
        .ToArray();
    } 
  }
}